/**
 * FieldRenderer — turns one schema field + its mapped value into HTML.
 *
 * This is the ONLY place that maps a field's `type` to an HTML control.
 * DynamicForm (govServices.js) iterates schema.fields and calls this for
 * each one — there is no ServiceNameForm.js per government service.
 *
 * Field behavior is entirely driven by schema metadata (type, required,
 * editable, validation, options) — nothing here branches on a specific
 * fieldId.
 */
const FieldRenderer = {
  // type -> native input[type] (text/textarea/select/boolean handled separately below)
  HTML_INPUT_TYPE: { text: 'text', number: 'number', date: 'date', email: 'email', phone: 'tel' },

  /** The editable control itself — input/select/textarea/checkbox. */
  control(field, value) {
    const id = `govFld_${field.fieldId}`;
    const disabled = field.editable === false ? 'disabled' : '';
    const val = value === null || value === undefined ? '' : value;

    if (field.type === 'textarea') {
      return `<textarea class="form-input" id="${id}" rows="2" oninput="govUpdateField('${field.fieldId}', this.value)" ${disabled}>${escapeHtml(val)}</textarea>`;
    }

    if (field.type === 'select') {
      const options = field.options || [];
      return `<select class="form-select" id="${id}" onchange="govUpdateField('${field.fieldId}', this.value)" ${disabled}>
        <option value="">Select...</option>
        ${options.map((opt) => `<option value="${escapeHtml(opt)}" ${opt === val ? 'selected' : ''}>${escapeHtml(opt)}</option>`).join('')}
      </select>`;
    }

    if (field.type === 'boolean') {
      return `<label class="form-check">
        <input type="checkbox" id="${id}" onchange="govUpdateField('${field.fieldId}', this.checked)" ${val ? 'checked' : ''} ${disabled}>
        <span>${escapeHtml(field.label)}</span>
      </label>`;
    }

    const htmlType = this.HTML_INPUT_TYPE[field.type] || 'text';
    return `<input class="form-input" type="${htmlType}" id="${id}" value="${escapeHtml(val)}" oninput="govUpdateField('${field.fieldId}', this.value)" ${disabled}>`;
  },

  /** The small "where this came from" / "we couldn't find this" indicator under a field. */
  provenance(fieldState) {
    if (fieldState.autoFilled) {
      return `<div class="form-hint" style="color:var(--clr-success);display:flex;align-items:center;gap:4px;font-weight:600">
        ${Icons.check} Auto-filled from ${escapeHtml(sourceLabel(fieldState.source))}
      </div>`;
    }
    if (fieldState.missing) {
      return `<div class="form-hint" style="color:var(--clr-warning);display:flex;align-items:center;gap:4px;font-weight:600">
        ${Icons.alertCircle} ${fieldState.required ? 'Required information not found — please enter it below.' : 'Not available from a connected source — optional.'}
      </div>`;
    }
    return '';
  },

  /** One full form row: label + control + provenance + validation error, for the editable form step. */
  row(fieldState, errorMessage) {
    const boolField = fieldState.type === 'boolean'; // checkbox already carries its own label
    return `
      <div class="form-group">
        ${boolField ? '' : `<label class="form-label" for="govFld_${fieldState.fieldId}">${escapeHtml(fieldState.label)}${fieldState.required ? ' <span style="color:var(--clr-error)">*</span>' : ''}</label>`}
        ${this.control(fieldState, fieldState.currentValue)}
        ${this.provenance(fieldState)}
        ${fieldState.description ? `<div class="form-hint">${escapeHtml(fieldState.description)}</div>` : ''}
        <div class="form-error ${errorMessage ? 'visible' : ''}">${escapeHtml(errorMessage || '')}</div>
      </div>
    `;
  },

  /** Read-only summary row for the Review step. */
  reviewRow(fieldState) {
    const displayValue = fieldState.currentValue === '' || fieldState.currentValue === null || fieldState.currentValue === undefined
      ? '—'
      : escapeHtml(String(fieldState.currentValue));
    let tag;
    if (fieldState.modified) {
      tag = `<span class="badge badge-blue">${Icons.edit} Entered by you</span>`;
    } else if (fieldState.autoFilled) {
      tag = `<span class="badge badge-green">${Icons.check} Auto-filled from ${escapeHtml(sourceLabel(fieldState.source))}</span>`;
    } else {
      tag = `<span class="badge badge-blue">${Icons.edit} Entered by you</span>`;
    }
    return `
      <div style="padding:var(--sp-3) 0;border-bottom:1px solid var(--clr-gray-100)">
        <div style="font-size:var(--fs-xs);color:var(--clr-gray-500);font-weight:600;text-transform:uppercase;letter-spacing:.03em">${escapeHtml(fieldState.label)}</div>
        <div style="font-size:var(--fs-md);font-weight:600;color:var(--clr-gray-900);margin:2px 0 4px">${displayValue}</div>
        ${tag}
      </div>
    `;
  }
};
