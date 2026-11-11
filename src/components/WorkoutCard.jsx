import PropTypes from 'prop-types';
import { Clock3, Dumbbell, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

export default function WorkoutCard({ workout, onEdit, onDelete, onPlan }) {
  return (
    <article className="workout-card">
      <div className="workout-card-art">
        <span className="workout-art-icon"><Dumbbell size={25} /></span>
        <span className="workout-level">{workout.level}</span>
        <div className="workout-art-orbit orbit-one" />
        <div className="workout-art-orbit orbit-two" />
      </div>
      <div className="workout-card-content">
        <div className="workout-card-heading">
          <div>
            <p className="eyebrow">TRAINING PROGRAM</p>
            <h3>{workout.name}</h3>
          </div>
          <div className="card-actions">
            <button className="icon-button subtle-icon" type="button" onClick={() => onEdit(workout)} aria-label={`Edit ${workout.name}`} title="Edit">
              <Pencil size={15} />
            </button>
            <button className="icon-button subtle-icon danger-hover" type="button" onClick={() => onDelete(workout.id)} aria-label={`Hapus ${workout.name}`} title="Hapus">
              <Trash2 size={15} />
            </button>
          </div>
        </div>
        <p className="workout-focus">{workout.focus}</p>
        <div className="workout-card-footer">
          <span className="meta-item"><Clock3 size={15} /> {workout.duration} min</span>
          <button className="text-button" type="button" onClick={() => onPlan(workout)}>
            Add to schedule <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>
  );
}

WorkoutCard.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    focus: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPlan: PropTypes.func.isRequired,
};
