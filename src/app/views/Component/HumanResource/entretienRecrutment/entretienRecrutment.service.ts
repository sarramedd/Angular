import { id } from 'date-fns/locale';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import * as countrycitystatejson from 'countrycitystatejson';
import { catchError, map } from 'rxjs/operators';
import { EgretCalendarEvent } from 'app/shared/models/event.model';
import { CalendarEventDB } from 'app/shared/inmemory-db/calendarEvents';
import { Employee } from 'app/shared/models/Employee';
import { Interview } from 'app/shared/models/Interview';
import { Evaluation } from 'app/shared/models/Evaluation';
import { QuestionType } from 'app/shared/models/QuestionType';
import { QuestionCategory } from 'app/shared/models/QuestionCategory';
import { Question } from 'app/shared/models/Question';

@Injectable()
export class entretienRecrutmentService {
  private apiUrl = 'http://localhost:8080/rh/employee'; 
  private apiUrlInterview = 'http://localhost:8080/rh/Interview';
  private apiUrlEvaluation = 'http://localhost:8080/rh/evaluation';
  private apiQuestionType = 'http://localhost:8080/rh/QuestionType';
  private apiQuestionCategory ='http://localhost:8080/rh/questionCategory'
  private countryData = countrycitystatejson;
  public events: EgretCalendarEvent[];
  constructor(private http: HttpClient) {}

  public getEvents(): Observable<EgretCalendarEvent[]> {
    // return this.http.get('api/calendar/events')
    // .map((events: CalendarEvent[]) => {
    //   this.events = events;
    //   return events;
    // });

    let eventDB = new CalendarEventDB();
    return of(eventDB.events).pipe(
      map((events) => {
        this.events = events;
        return events;
      })
    );
  }
  
  public addEvent(event): Observable<EgretCalendarEvent[]> {
    // return this.http.post('api/calendar/events', event)
    // .map((events: EgretCalendarEvent[]) => {
    //   this.events = events;
    //   return events;
    // });

    this.events.push(event);
    return of(this.events);
  }

  public updateEvent(event): Observable<EgretCalendarEvent[]> {
    // return this.http.put('api/calendar/events/'+event._id, event)
    // .map((events: EgretCalendarEvent[]) => {
    //   this.events = events;
    //   return events;
    // });

    this.events = this.events.map((e) => {
      if (e._id === event._id) {
        return Object.assign(e, event);
      }
      return e;
    });
    return of(this.events);
  }

  public deleteEvent(eventID: string): Observable<EgretCalendarEvent[]> {
    // return this.http.delete('api/calendar/events/'+eventID)
    // .map((events: EgretCalendarEvent[]) => {
    //   this.events = events;
    //   return events;
    // });

    this.events = this.events.filter((e) => e._id !== eventID);
    return of(this.events);
  }







  /////////////////////////Back Connection//////////////////////////
//******* Implement your APIs ********
getItems(): Observable<Employee[]> {
  const apiUrlWithGET = this.apiUrl + '/getEmployees';
  return this.http.get<any>(apiUrlWithGET).pipe(
    catchError(this.handleError)
  );
}

getAllQuestiontypes(): Observable<QuestionType[]> {
  const apiUrlWithGET = this.apiQuestionType + '/getAll';
  return this.http.get<any>(apiUrlWithGET).pipe(
    catchError(this.handleError)
  );
}
getAllQuestionCategories(): Observable<QuestionCategory[]> {
  const apiUrlWithGET = this.apiQuestionCategory + '/getAll';
  return this.http.get<any>(apiUrlWithGET).pipe(
    catchError(this.handleError)
  );
}
getQuestionCategoriesByType(id:number):Observable<QuestionCategory[]> {
  const url =  `${this.apiQuestionType+ '/get'}/${id}`+ '/questionCategories';
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
}

getQuestionByTypeAndCategory(id:number ,Id:number):Observable<Question[]> {
  const url =  `${this.apiQuestionType+ '/get'}/${id}/${Id}`+ '/questions';
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
}

 // GET an item by id
 getItem(id: number): Observable<Employee> {
  const url = `${this.apiUrl+ '/get'}/${id}`;
  return this.http.get<Employee>(url).pipe(
    catchError(this.handleError)
  );
}

// POST a new item
addItem(candidate: any): Observable<any> {
  const apiUrlWithAdd = this.apiUrl + '/add'; // Append /add to the apiUrl
  return this.http.post<any>(apiUrlWithAdd, candidate).pipe(
    catchError(this.handleError)
  );
}

// POST a new evaluation
addEvaluation(evaluation: any): Observable<any> {
  const apiUrlEvaluationWithAdd = this.apiUrlEvaluation + '/add'; // Append add to the apiUrl
  return this.http.post<any>(apiUrlEvaluationWithAdd, evaluation).pipe(
    catchError(this.handleError)
  );
}

// GET an evaluation
getEvaluation(id: number): Observable<Evaluation> {
  const url = `${this.apiUrlEvaluation+ '/get'}/${id}`;
  return this.http.get<Evaluation>(url).pipe(
    catchError(this.handleError)
  );
  }

// POST a new interview
addInterview(interview: any): Observable<any> {
  const apiUrlInterviewWithAdd = this.apiUrlInterview + '/add'; // Append /add to the apiUrl
  return this.http.post<any>(apiUrlInterviewWithAdd, interview).pipe(
    catchError(this.handleError)
  );
}

// GET an interview
getInterview(id: number): Observable<Interview> {
  const url = `${this.apiUrlInterview+ '/getBy'}/${id}`;
  return this.http.get<Interview>(url).pipe(
    catchError(this.handleError)
  );
  }

  

  getEmployeeEvaluation(id: number): Observable<Interview> {
    const url =  `${this.apiUrl+ '/get'}/${id}`+ '/evaluation';
    return this.http.get<Interview>(url).pipe(
      catchError(this.handleError)
    );
    }

// PUT an existing item
updateItem(id: number, candidate: Employee): Observable<Employee> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.put<Employee>(url, candidate).pipe(
    catchError(this.handleError)
  );
}

updateToPlannedById(id: number): Observable<any> {
  const url = `${this.apiUrlInterview}/updateStatusToPlannedById/${id}`;
  return this.http.put<any>(url, {}).pipe(
    catchError(this.handleError)
  );
}

updateToEndedById(id: number): Observable<any> {
  const url = `${this.apiUrlInterview}/updateStatusToEndedById/${id}`;
  return this.http.put<any>(url, {}).pipe(
    catchError(this.handleError)
  );
}

updateToCancelledById(id: number): Observable<any> {
  const url = `${this.apiUrlInterview}/updateStatusToCancelledById/${id}`;
  return this.http.put<any>(url, {}).pipe(
    catchError(this.handleError)
  );
}


// DELETE an item by id
deleteItem(id: number): Observable<Employee> {
 
  const url = `${this.apiUrl+'/delete'}/${id}`;
  return this.http.delete<Employee>(url).pipe(
    catchError(this.handleError)
  );
}

////////////////////////////////////////////////////////
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
}

//------getEmployeeByEvaluationId---------
getEmployeeById(id: number): Observable<any> {
  const url = `${this.apiUrlEvaluation+ '/get'}/${id}`+ '/employee';
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
}
getInterviewsById(id: number): Observable<any> {
  const url = `${this.apiUrlEvaluation+ '/get'}/${id}`+ '/interview';
  return this.http.get<any>(url).pipe(
    catchError(this.handleError)
  );
}

}