import { Box, CircularProgress } from "@mui/material";

/**
 * Loading component to display a centered loading spinner.
 * Uses MUI's Box and CircularProgress components for consistent styling.
 *
 * @returns {JSX.Element} The centered loading spinner.
 */
const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
