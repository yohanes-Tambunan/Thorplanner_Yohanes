import PropTypes from 'prop-types';
import { ArrowUpRight, Dumbbell, HeartPulse, PlayCircle } from 'lucide-react';

const muscleClass = {
  Chest: 'muscle-chest', Back: 'muscle-back', Shoulders: 'muscle-shoulders',
  Arms: 'muscle-arms', Legs: 'muscle-legs', Core: 'muscle-core', Cardio: 'muscle-cardio',
};

export default function ExerciseCard({ exercise, onSelect }) {
  return (
    <button className="exercise-card" type="button" onClick={() => onSelect(exercise)}>
      <div className={`exercise-art ${muscleClass[exercise.muscle] || ''}`}>
        <span className="exercise-muscle-label">{exercise.muscle}</span>
        <span className="exercise-video-badge"><PlayCircle size={12} /> Video</span>
        {exercise.type === 'cardio' ? <HeartPulse size={29} strokeWidth={1.5} /> : <Dumbbell size={29} strokeWidth={1.5} />}
        <span className="exercise-art-index">{exercise.id.replace('ex-', '#')}</span>
      </div>
      <div className="exercise-card-content">
        <div className="exercise-title-row">
          <h3>{exercise.name}</h3>
          <ArrowUpRight size={16} />
        </div>
        <p>{exercise.equipment}</p>
        <div className="exercise-card-tags">
          <span>{exercise.type === 'cardio' ? `${exercise.sets} sesi` : `${exercise.sets} set`}</span>
          <span>{exercise.type === 'cardio' ? exercise.reps : `${exercise.reps} repetisi`}</span>
          <span>Level: {exercise.trainingLevel || exercise.level}</span>
          {exercise.isRecommended && <span className="exercise-recommended-tag">Pilihan untukmu</span>}
        </div>
      </div>
    </button>
  );
}

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    muscle: PropTypes.string.isRequired,
    equipment: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    sets: PropTypes.number.isRequired,
    reps: PropTypes.string.isRequired,
    trainingLevel: PropTypes.string,
    isRecommended: PropTypes.bool,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};
