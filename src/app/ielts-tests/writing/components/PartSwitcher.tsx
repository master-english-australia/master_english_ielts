import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PartSwitcherProps {
  currentPart: 'part1' | 'part2';
  isSubmitted: boolean;
  onPartChange: (part: 'part1' | 'part2') => void;
  onSubmit: () => void;
}

export const PartSwitcher = ({
  currentPart,
  isSubmitted,
  onPartChange,
  onSubmit
}: PartSwitcherProps) => {
  return (
    <div className="part-switcher">
      <div className="part-navigation">
        <div className="arrow-buttons">
          <button 
            className={`nav-arrow ${currentPart === 'part2' ? 'active' : ''}`}
            onClick={() => onPartChange('part1')}
            disabled={currentPart === 'part1'}
          >
            <IoIosArrowBack />
          </button>
          <button 
            className={`nav-arrow ${currentPart === 'part1' ? 'active' : ''}`}
            onClick={() => onPartChange('part2')}
            disabled={currentPart === 'part2'}
          >
            <IoIosArrowForward />
          </button>
        </div>
        <button 
          className="submit-btn"
          onClick={onSubmit}
          disabled={isSubmitted}
        >
          Submit
        </button>
      </div>
      <button 
        className={`part-button ${currentPart === 'part1' ? 'active' : ''}`}
        onClick={() => onPartChange('part1')}
      >
        Part 1
      </button>
      <button 
        className={`part-button ${currentPart === 'part2' ? 'active' : ''}`}
        onClick={() => onPartChange('part2')}
      >
        Part 2
      </button>
    </div>
  );
}; 