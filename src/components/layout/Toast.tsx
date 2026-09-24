import { useApp } from '../../context/AppContext';
import Icon from '../ui/Icon';

export default function Toast() {
  const { toast } = useApp();
  return (
    <div className="toast-host" role="status" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.id}>
          <span className="toast__icon">
            <Icon name="check" size={14} stroke={2.4} />
          </span>
          {toast.message}
        </div>
      )}
    </div>
  );
}
