import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingSpinner() {
  return (
    <tr style={{ height: 375 }}>
      <td colSpan={6}>
        <Box>
          <CircularProgress />
        </Box>
      </td>
    </tr>
  );
}
