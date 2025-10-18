import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert, Row, Col } from 'react-bootstrap';
import Select from 'react-select'
import styles from './GenericFormModal.module.css';

// Helper function to format dates
const formatDateToYYYYMMDD = (date) => {
  if (!date) return '';
  try {
    if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}/)) {
      return date.substring(0, 10);
    }
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    if (isNaN(year)) return '';
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error formateando fecha:", date, error);
    return '';
  }
};

function GenericFormModal({
  show,
  onHide,
  title,
  initialData = {},
  fieldsConfig = [],
  onSave,
  isSubmitting,
  submitError,
  saveButtonText = "Guardar",
  savingButtonText = "Guardando...",
  getDerivedFields
}) {
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);
  const [personaError, setPersonaError] = useState('');
  const headerClass = title.toLowerCase().includes('editar') ? styles.modalHeaderPrimary : styles.modalHeaderSuccess;

  // States for input values of selects
  const [iglesiaInput, setIglesiaInput] = useState('');
  const [personaInput, setPersonaInput] = useState('');

  useEffect(() => {
    if (show) {
      const initialFormState = {};
      fieldsConfig.forEach(field => {
        let value = initialData[field.name] ?? (field.defaultValue ?? '');
        if (field.type === 'checkboxGroup') {
          initialFormState[field.name] = Array.isArray(value) ? value : [];
        } else if (field.type === 'password' && initialData.id) {
          initialFormState[field.name] = '';
        } else if (field.type === 'checkbox') {
          initialFormState[field.name] = !!value;
        } else if (field.type === 'date') {
          initialFormState[field.name] = formatDateToYYYYMMDD(value);
        } else if ((field.type === 'select' || field.type === 'radioGroup') && value != null) {
          initialFormState[field.name] = value.toString();
        } else if (field.type === 'async-autocomplete' && value && typeof value === 'object' && value.value) {
          initialFormState[field.name] = value;
        } else {
          initialFormState[field.name] = value;
        }
      });
      setFormData(initialFormState);
      setValidated(false);
      setPersonaError('');
      setIglesiaInput('');
      setPersonaInput('');
    }
    if (!show) {
      setValidated(false);
      setPersonaError('');
      setIglesiaInput('');
      setPersonaInput('');
    }
  }, [show, initialData, fieldsConfig]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' && !fieldsConfig.find(f => f.name === name && f.type === 'checkboxGroup')
      ? checked
      : value;
    let updatedForm = { ...formData, [name]: newValue };

    if (getDerivedFields) {
      const derived = getDerivedFields(name, newValue);
      if (derived && typeof derived === 'object' && Object.keys(derived).length > 0) {
        updatedForm = { ...updatedForm, ...derived };
      }
    }
    setFormData(updatedForm);
  };

  const handleCheckboxGroupChange = (fieldName, optionValue) => {
    const numOptionValue = !isNaN(parseInt(optionValue, 10)) ? parseInt(optionValue, 10) : optionValue;
    setFormData(prev => {
      const currentSelection = prev[fieldName] || [];
      const newSelection = currentSelection.includes(numOptionValue)
        ? currentSelection.filter(val => val !== numOptionValue)
        : [...currentSelection, numOptionValue];
      return { ...prev, [fieldName]: newSelection };
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    if (isSubmitting) return;

    // Validación extra para persona_id (DNI afiliado)
    const personaField = fieldsConfig.find(f => f.name === 'persona_id');
    if (personaField) {
      const afiliados = personaField.afiliados || [];
      if (afiliados.includes(formData['persona_id'])) {
        setPersonaError('No se puede usar este DNI, ya está afiliado a una cuenta.');
        setValidated(true);
        return;
      }
    }

    const dataToSave = { ...formData };
    fieldsConfig.forEach(field => {
      if ((field.type === 'select' || field.type === 'radioGroup' || (field.attributes && field.attributes.type === 'number'))) {
        if (dataToSave[field.name] != null && dataToSave[field.name] !== '') {
          const numericValue = parseInt(dataToSave[field.name], 10);
          if (!isNaN(numericValue)) {
            dataToSave[field.name] = numericValue;
          }
        }
      }
      if (field.type === 'async-autocomplete' && dataToSave[field.name] && typeof dataToSave[field.name] === 'object') {
        dataToSave[field.name] = dataToSave[field.name].value;
      }
    });
    onSave({ ...initialData, ...dataToSave });
  };

  // Render the fields
  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name] || (field.type === 'checkboxGroup' ? [] : ''),
      onChange: field.type === 'checkboxGroup' || field.type === 'radioGroup' ? () => { } : handleChange,
      isInvalid: validated && field.required &&
        (field.type === 'checkboxGroup' ? (!formData[field.name] || formData[field.name].length === 0) :
          (field.type === 'checkbox' ? !formData[field.name] : !formData[field.name] && formData[field.name] !== false)
        ),
      disabled: field.disabled || isSubmitting,
      className: field.type === 'select' ? styles.formSelect : styles.formControl
    };

    // --- Para el campo IGLESIA ---
    if (field.name === 'iglesia_id') {
      // field.options debe ser [{ label, value, ... }]
      return (
        <Select
          name={field.name}
          options={
            iglesiaInput.length >= 3
              ? (field.options || []).filter(opt =>
                opt.label?.toLowerCase().includes(iglesiaInput.toLowerCase())
              )
              : []
          }
          inputValue={iglesiaInput}
          onInputChange={(input) => setIglesiaInput(input)}
          value={(field.options || []).find(opt => opt.value === formData[field.name]) || null}
          onChange={selected => {
            setFormData(prev => ({
              ...prev,
              [field.name]: selected ? selected.value : ''
            }));
          }}
          isClearable
          isDisabled={isSubmitting}
          placeholder={field.placeholder || "Busque por iglesia"}
          required={field.required}
          styles={{
            control: base => ({
              ...base,
              minHeight: '38px'
            })
          }}
        />
      );
    }

    // --- Para el campo PERSONA (DNI/Persona) ---
    if (field.type === 'autocomplete' && field.name === 'persona_id') {
      // field.options debe ser [{ label, value, ... }]
      const afiliados = field.afiliados || [];
      return (
        <div>
          <Select
            name={field.name}
            options={
              personaInput.length >= 3
                ? (field.options || []).filter(opt =>
                  opt.label?.toLowerCase().includes(personaInput.toLowerCase())
                )
                : []
            }
            inputValue={personaInput}
            onInputChange={input => setPersonaInput(input)}
            value={(field.options || []).find(opt => opt.value === formData[field.name]) || null}
            onChange={selected => {
              if (selected && afiliados.includes(selected.value)) {
                setPersonaError('No se puede usar este DNI, ya está afiliado a una cuenta.');
                setFormData(prev => ({
                  ...prev,
                  [field.name]: '',
                  nombre: '',
                  apellido: ''
                }));
              } else {
                setPersonaError('');
                setFormData(prev => ({
                  ...prev,
                  [field.name]: selected ? selected.value : '',
                  nombre: selected ? selected.nombres : '',
                  apellido: selected ? `${selected.apellido_paterno || ''} ${selected.apellido_materno || ''}`.trim() : ''
                }));
              }
            }}
            isClearable
            isDisabled={isSubmitting}
            placeholder={field.helperText || "Buscar por DNI, nombre o apellido..."}
            required={field.required}
            styles={{
              control: base => ({
                ...base,
                minHeight: '38px'
              })
            }}
          />
          {field.name === 'persona_id' && personaError && (
            <div className="text-danger mt-1">{personaError}</div>
          )}
        </div>
      );
    }

    // --- Otros campos ---
    switch (field.type) {
      case 'text':
        return (
          <Form.Control
            type="text"
            placeholder={field.placeholder || ''}
            required={field.required}
            minLength={field.minLength}
            {...field.attributes}
            {...commonProps}
            readOnly={field.readOnly}
          />
        );
      case 'email':
      case 'password':
      case 'number':
      case 'date':
        return (
          <Form.Control
            type={field.type}
            placeholder={field.placeholder || ''}
            required={field.required}
            minLength={field.minLength}
            min={field.min}
            max={field.max}
            {...field.attributes}
            {...commonProps}
            value={field.type === 'date' ? (formData[field.name] || '') : commonProps.value}
          />
        );
      case 'textarea':
        return (
          <Form.Control
            as="textarea"
            rows={field.rows || 3}
            placeholder={field.placeholder || ''}
            required={field.required}
            minLength={field.minLength}
            {...field.attributes}
            {...commonProps}
          />
        );
      case 'select':
        return (
          <Form.Select
            {...commonProps}
            required={field.required}
            value={formData[field.name] || ''}
            onChange={(e) => {
              handleChange(e);
              if (field.onChange) {
                field.onChange(e.target.value);
              }
            }}
          >
            {field.placeholderOption && <option value="">{field.placeholderOption}</option>}
            {field.options?.map(opt => (
              <option key={opt[field.optionValueKey]} value={opt[field.optionValueKey]}>
                {typeof field.optionLabelKey === "function"
                  ? field.optionLabelKey(opt)
                  : opt[field.optionLabelKey]}
              </option>
            ))}
          </Form.Select>
        );
      case 'checkboxGroup':
        return (
          <div className={styles.checkboxContainer}>
            {field.options?.map(opt => (
              <Form.Check
                type="checkbox"
                key={opt[field.optionValueKey]}
                id={`${field.name}-${opt[field.optionValueKey]}`}
                label={typeof field.optionLabelKey === "function"
                  ? field.optionLabelKey(opt)
                  : opt[field.optionLabelKey]}
                checked={(formData[field.name] || []).includes(opt[field.optionValueKey])}
                onChange={() => handleCheckboxGroupChange(field.name, opt[field.optionValueKey])}
                disabled={isSubmitting}
                className={styles.checkboxGroup}
                isInvalid={validated && field.required && (!formData[field.name] || formData[field.name].length === 0)}
              />
            ))}
            {validated && field.required && (!formData[field.name] || formData[field.name].length === 0) && (
              <div className="d-block invalid-feedback" style={{ marginTop: '-0.25rem' }}>
                {field.validationMessage || `Debe seleccionar al menos una opción para ${field.label.toLowerCase()}.`}
              </div>
            )}
          </div>
        );
      case 'radioGroup':
        return (
          <div className={styles.radioContainer}>
            {field.options?.map(opt => (
              <Form.Check
                type="radio"
                key={opt.value}
                id={`${field.name}-${opt.value}`}
                label={opt.label}
                name={field.name}
                value={opt.value}
                checked={formData[field.name] === opt.value.toString()}
                onChange={handleChange}
                required={field.required}
                disabled={isSubmitting}
                className={styles.radioGroup}
                isInvalid={validated && field.required && !formData[field.name]}
              />
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <Form.Check
            type="checkbox"
            id={`form-${field.name}`}
            label={field.checkboxLabel || field.label}
            checked={!!formData[field.name]}
            onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.checked }))}
            disabled={isSubmitting}
            className={styles.checkboxSingle}
            isInvalid={validated && field.required && !formData[field.name]}
          />
        );
      case 'time':
        return (
          <Form.Control
            type="time"
            placeholder={field.placeholder || ''}
            required={field.required}
            {...field.attributes}
            {...commonProps}
          />
        );
      case 'custom':
        return field.render ? field.render() : null;
      case 'file':
        return (
          <Form.Control
            type="file"
            name={field.name}
            multiple={field.multiple}
            accept={field.accept || "*/*"}
            required={field.required}
            disabled={isSubmitting}
            isInvalid={validated && field.required && (!formData[field.name] || formData[field.name].length === 0)}
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setFormData(prev => ({
                ...prev,
                [field.name]: files
              }));
            }}
          />
        );

      default:
        return <p>Tipo de campo no soportado: {field.type}</p>;
    }
  };

  const renderFormField = (field) => (
    <Form.Group className={styles.formGroup} controlId={`form-${field.name}`} key={field.name}>
      <Form.Label className={styles.formLabel}>
        {field.label}
        {field.required && <span className="text-danger">*</span>}
      </Form.Label>
      {renderField(field)}
      {field.type !== 'checkboxGroup' && field.type !== 'radioGroup' && field.type !== 'checkbox' && (
        <Form.Control.Feedback type="invalid">
          {field.validationMessage || `El campo ${field.label.toLowerCase()} es requerido.`}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );

  // Split fields into columns if needed
  const DUAL_COLUMN_THRESHOLD = 5;
  const useDualColumn = fieldsConfig.length > DUAL_COLUMN_THRESHOLD;
  const midpoint = Math.ceil(fieldsConfig.length / 2);
  const leftFields = useDualColumn ? fieldsConfig.slice(0, midpoint) : [];
  const rightFields = useDualColumn ? fieldsConfig.slice(midpoint) : [];

  return (
    <Modal
      show={show}
      onHide={isSubmitting ? () => { } : onHide}
      backdrop="static"
      keyboard={false}
      centered
      size="xl"
      dialogClassName={styles.modalDialog}
      contentClassName={styles.modalContent}
    >
      <Modal.Header closeButton={!isSubmitting} className={`${styles.modalHeader} ${headerClass}`}>
        <Modal.Title className={styles.modalTitle}>{title}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className={styles.modalBody}>
          {submitError && !isSubmitting && (
            <Alert variant="danger" className={`${styles.alertError} mb-4`}>{submitError}</Alert>
          )}

          {isSubmitting ? (
            <div className={styles.loadingState}>
              <Spinner animation="border" role="status" variant="primary" style={{ width: '2.5rem', height: '2.5rem' }} />
              <p className="mt-3 text-primary">En trámite, por favor espere...</p>
            </div>
          ) : (
            <Row>
              {useDualColumn ? (
                <>
                  <Col md={6}>{leftFields.map(renderFormField)}</Col>
                  <Col md={6}>{rightFields.map(renderFormField)}</Col>
                </>
              ) : (
                <Col>{fieldsConfig.map(renderFormField)}</Col>
              )}
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button variant="outline-secondary" onClick={onHide} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button variant={title.toLowerCase().includes('editar') ? "primary" : "success"} type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="ms-1">{savingButtonText}</span>
              </>
            ) : (
              saveButtonText
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default GenericFormModal;