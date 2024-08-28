import { Button } from "@mui/material"
import { useQuestionsData } from "./hooks/useQuestionData"
import { useQuestionsStore } from "./store/questions"



export const Footer = () => {
    const { correct, incorrect, unanswered } = useQuestionsData()
    const reset = useQuestionsStore(state => state.reset)

    const handleReset = () => {
        reset()
    }

    return (
        <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#222', color: 'white' }}>
            <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
            <Button onClick={handleReset} sx={{ marginTop: '1rem' }}>
                Resetear juego
            </Button>
        </footer>
    )
}