import { Box, Button, Stack } from '@mui/material';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PartSwitcherProps {
  currentPart: number;
  totalParts: number;
  isSubmitted: boolean;
  onPartChange: (part: number) => void;
  onSubmit?: () => void;
}

export const PartSwitcher = ({
  currentPart,
  totalParts,
  isSubmitted,
  onPartChange,
  onSubmit
}: PartSwitcherProps) => {
  const parts = Array.from({ length: totalParts }, (_, i) => i + 1);

  return (
    <Box className="part-switcher" sx={{ width: '100%' }}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onPartChange(currentPart - 1)}
              disabled={currentPart === 1}
              sx={{
                minWidth: 'auto',
                p: 1,
                color: 'white',
                backgroundColor: currentPart > 1 ? 'black' : 'grey.300',
                borderColor: currentPart > 1 ? 'black' : 'grey.300',
              }}
            >
              <IoIosArrowBack />
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onPartChange(currentPart + 1)}
              disabled={currentPart === totalParts}
              sx={{
                minWidth: 'auto',
                p: 1,
                color: 'white',
                backgroundColor: currentPart < totalParts ? 'black' : 'grey.300',
                borderColor: currentPart < totalParts ? 'black' : 'grey.300',
              }}
            >
              <IoIosArrowForward />
            </Button>
          </Stack>
          {onSubmit && (
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={isSubmitted}
              sx={{ ml: 'auto' }}
            >
              Submit
            </Button>
          )}
        </Stack>
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            width: '100%',
            '& > button': {
              flex: 1,
              minWidth: 0,
              color: 'black',
              border: '1px solid grey.300',
            }
          }}
        >
          {parts.map((part) => (
            <Button
              key={part}
              variant="outlined"
              onClick={() => onPartChange(part)}
              sx={{
                py: 1,
                border: currentPart === part ? '1px solid red' : '1px solid grey',
              }}
            >
              Part {part}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};