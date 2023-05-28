import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionCategory } from 'app/shared/models/QuestionCategory';
import { QuestionType } from 'app/shared/models/QuestionType';
import { entretienRecrutmentService } from '../../entretienRecrutment.service';
import { Question } from 'app/shared/models/Question';

@Component({
  selector: 'app-popup',
  templateUrl: './questionnaire-popup.component.html',
  //styleUrls: ['./questionnaire-popup.component.css']
})
export class questionnairePopupComponent {
  questionTypes: QuestionType[];
  questionCategories: QuestionCategory[];
  filteredQuestionCategories: QuestionCategory[];
  questions: Question[];

  selectedQuestionType: QuestionType;
  selectedQuestionCategory: QuestionCategory;
  selectedQuestionCategoryId: number;

  filtersSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<questionnairePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: entretienRecrutmentService
  ) {
    this.questionTypes = data.questionTypes;
    this.selectedQuestionCategoryId = null; // Reset the selected question category
    this.questionCategories = data.questionCategories;
    this.filteredQuestionCategories = [];
    this.questions = [];
  }

  onQuestionTypeChange(): void {
    this.filteredQuestionCategories = this.questionCategories.filter(
      (category) => category.questionTypeNum === this.selectedQuestionType?.id
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  applyFilters(): void {
    const filters = {
      questionType: this.selectedQuestionType,
      questionCategory: this.selectedQuestionCategory
    };
    this.filtersSelected.emit(filters);
    this.getQuestions();
  }

  ngOnInit() {
    this.getCategoryTypes();
  }

  getCategoryTypes() {
    this.service.getAllQuestiontypes().subscribe(
      (questionTypes: QuestionType[]) => {
        this.questionTypes = questionTypes;
        this.filterQuestionCategories();
      },
      (error) => {
        console.error('Failed to retrieve question types', error);
      }
    );
  }

  filterQuestionCategories() {
    if (this.selectedQuestionType) {
      this.service.getQuestionCategoriesByType(this.selectedQuestionType.id).subscribe(
        (questionCategories: QuestionCategory[]) => {
          this.filteredQuestionCategories = questionCategories;
          this.selectedQuestionCategory = null; // Reset the selected question category
          this.getQuestions();
        },
        (error) => {
          console.error('Failed to retrieve question categories', error);
        }
      );
    } else {
      this.filteredQuestionCategories = [];
      this.selectedQuestionCategory = null; // Reset the selected question category
      this.getQuestions();
    }
  }

  getQuestions(): void {
    if (this.selectedQuestionType && this.selectedQuestionCategory) {
      const typeId = this.selectedQuestionType.id;
      const categoryId = this.selectedQuestionCategory.id;

      this.service.getQuestionByTypeAndCategory(typeId, categoryId).subscribe(
        (questions: Question[]) => {
          this.questions = questions;
          console.log(this.questions);
        },
        (error) => {
          console.error('Failed to retrieve questions', error);
        }
      );
    } else {
      this.questions = [];
    }}}