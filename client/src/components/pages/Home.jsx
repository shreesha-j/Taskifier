import { Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { Box } from '@mui/material';
/**
 * Home component prompting the user to create their first board.
 *
 * @returns {JSX.Element} The home screen with a "create board" prompt.
 */
const Home = () => {
  /**
   * Placeholder function for creating a board.
   */
  const createBoard = async () => {
    // Implement board creation logic here
  };

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
      >
        Click here to create your first board
      </LoadingButton>
    </Box>
  )
}

export default Home