import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Field from './Field';

function ObjectProperties({
  schema,
  value,
  onChange,
}) {
  return Object.keys(schema.properties).map((key) => {
    const subSchema = schema.properties[key];
    const subValue = value[key];
    const subChange = (newValue) => onChange({
      ...value,
      [key]: newValue,
    });

    return (
      <FormGroup>
        <Field schema={subSchema} value={subValue} onChange={subChange} />
      </FormGroup>
    );
  });
}

ObjectProperties.propTypes = {
  schema: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

function ObjectField({ schema, value, onChange }) {
  return (
    <FormControl component="fieldset">
      {schema.title && <FormLabel component="legend">{schema.title}</FormLabel>}
      {schema.description && <FormHelperText>{schema.description}</FormHelperText>}
      <ObjectProperties schema={schema} value={value} onChange={onChange} />
    </FormControl>
  );
}

ObjectField.propTypes = {
  schema: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { ObjectProperties };
export default ObjectField;
