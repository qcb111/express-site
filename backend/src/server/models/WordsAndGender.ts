export interface WordsAndGender{
    word: string;
    gender: string;
    reviewState: ReviewState;
}

export interface ReviewState{
    correctTimes: number;
    wrongTimes: number;
    isArchived: boolean;
}

