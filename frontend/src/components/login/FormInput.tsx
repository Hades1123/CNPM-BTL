interface FormInputProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  icon: string;
  error?: string;
  showToggle?: boolean;
  isVisible?: boolean;
  onToggle?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
  label,
  name,
  value,
  type = 'text',
  placeholder,
  icon,
  error,
  showToggle,
  isVisible,
  onToggle,
  onChange,
}: FormInputProps) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <div className={`input-icon ${error ? 'error-border' : ''}`}>
      <input
        type={showToggle ? (isVisible ? 'text' : 'password') : type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
        placeholder={placeholder}
      />
      {showToggle ? (
        <i className="material-icons clickable-icon" onClick={onToggle}>
          {isVisible ? 'visibility' : 'visibility_off'}
        </i>
      ) : (
        <i className="material-icons">{icon}</i>
      )}
    </div>
    {error && <span className="error-text">{error}</span>}
  </div>
);
