import { Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch } from "react-redux"
import { setBoards } from "../redux/features/boardSlice"
import { useNavigate } from "react-router-dom"
import boardApi from "../api/boardApi"
import { useState } from "react"
/**
 * Home component prompting the user to create their first board.
 *
 * @returns {JSX.Element} The home screen with a "create board" prompt.
 */
const Home = () => {
  /**
   * Placeholder function for creating a board.
   */
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  /**
   * Function to create a board.
   * Calls the board API to create a board, saves the response to the state and navigates to the new board.
   * @returns {Promise<void>} A promise to indicate the end of the call.
   */
  const createBoard = async () => {
    setLoading(true)
    try {
      // Call the API to create a board
      const res = await boardApi.create()
      // Save the new board to the state
      dispatch(setBoards([res]))
      // Navigate to the new board
      navigate(`/boards/${res.id}`)
    } catch (err) {
      // Handle any errors
      alert(err)
    } finally {
      // Set the loading state back to false
      setLoading(false)
    }
  }

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <LoadingButton
        variant='outlined'
        color='success'
        onClick={createBoard}
        loading={loading}
      >
        Click here to create your first board
      </LoadingButton>
    </Box>
  )
}

export default Home