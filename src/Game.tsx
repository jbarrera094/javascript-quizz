import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { Question as QuestionType } from './types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

const getBakcgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info

    // ususario sin seleccionar respuesta
    if (userSelectedAnswer == null) return 'transparent'
    // si ya selecciono pero la solución es incorrecta
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    // si la respuesta es correcta
    if (index === correctAnswer) return 'green'
    // si la respuesta es incorrecta
    if (index === userSelectedAnswer) return 'red'
    // si no es ninguna de las anteriores
    return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    return (
        <Card variant='outlined' sx={{ bgcolor: '#222', textAlign: 'left', padding: '1rem', marginTop: 4 }}>
            <Typography variant='h5'>{info.question}</Typography>

            <SyntaxHighlighter language='javascript' style={nightOwl}>
                {info.code}
            </SyntaxHighlighter>

            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton
                            onClick={createHandleClick(index)}
                            sx={{ backgroundColor: getBakcgroundColor(info, index) }}
                            disabled={info.userSelectedAnswer != null} >
                            <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionsStore(state => state.questions)
    const currentQuestionIndex = useQuestionsStore(state => state.currentQuestionIndex)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPrevQuestion = useQuestionsStore(state => state.goPrevQuestion)

    const currentQuestion = questions[currentQuestionIndex]

    return (
        <>
            <Stack direction='row' gap={2} justifyContent='center' alignItems={'center'}>
                <IconButton onClick={goPrevQuestion} disabled={currentQuestionIndex === 0}>
                    <ArrowBackIosNew />
                </IconButton>

                {currentQuestionIndex + 1} / {questions.length}

                <IconButton onClick={goNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Question info={currentQuestion} />
            <Footer />
        </>
    )
}
