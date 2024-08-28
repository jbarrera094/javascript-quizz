import { create } from 'zustand';
import { Question } from '../types';
import confetti from 'canvas-confetti';
import { persist, devtools } from 'zustand/middleware';
import { getAllQuestions } from '../services/questions';

interface State {
    questions: Question[]
    currentQuestionIndex: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void
    goPrevQuestion: () => void
    reset: () => void
}

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {
    return {
        questions: [],
        currentQuestionIndex: 0,

        fetchQuestions: async (limit: number) => {
            getAllQuestions(limit).then(questions => {
                set({ questions }, false, "FETCH_QUESTIONS")
            })
        },

        selectAnswer: (questionId, answerIndex) => {
            const { questions } = get()
            // use the structureClone for object clone
            const newQuestions = structuredClone(questions)
            // encontramos el indice de la pregunta
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            // obtener la pregunta
            const questionInfo = newQuestions[questionIndex]
            // comprobar si la respuesta es correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

            //* si la respuesta es correcta, lanzar confetti
            if (isCorrectUserAnswer) confetti();
            // cambiar esta información en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }
            // actualizar el estado
            set({ questions: newQuestions }, false, "SELECT_ANSWER")
        },

        goNextQuestion: () => {
            const { questions, currentQuestionIndex } = get()
            const nextIndex = currentQuestionIndex + 1
            if (nextIndex >= questions.length) return
            set({ currentQuestionIndex: nextIndex }, false, "GO_NEXT_QUESTION")
        },

        goPrevQuestion: () => {
            const { currentQuestionIndex } = get()
            const prevIndex = currentQuestionIndex - 1
            if (prevIndex < 0) return
            set({ currentQuestionIndex: prevIndex }, false, "GO_PREV_QUESTION")
        },

        reset: () => {
            set({ questions: [], currentQuestionIndex: 0 }, false, "RESET")
        }

    }
}, { name: 'questions-store' })))