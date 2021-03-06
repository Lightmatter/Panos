import PropTypes from 'prop-types';
import { FormControl, TextField, FormHelperText } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';

const InputField = ({
  fullWidth,
  formControlClassName,
  helperText,
  variant,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { name, errors } = props;
  const isError = Boolean(
    (meta.error && meta.touched) || meta.initialError || errors[name]
  );

  const formattedHelperText = <>{helperText}</>;
  return (
    <FormControl
      fullWidth={fullWidth}
      error={isError}
      className={formControlClassName}
    >
      <TextField variant={variant} {...field} {...props} />
      {(isError || formattedHelperText) && (
        <FormHelperText>
          {isError
            ? meta.error || meta.initialError || errors[name]
            : formattedHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  formControlClassName: PropTypes.string,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
  variant: PropTypes.string,
};

InputField.defaultProps = {
  fullWidth: true,
  formControlClassName: '',
  helperText: '',
  errors: {},
  variant: 'filled',
};

export default InputField;
