import { IconButton, Stack, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import PropTypes from "prop-types";

function clamp(value, min, max) {
  const minValue = Number(min);
  const numericValue = Number(value);
  const normalizedValue = Number.isFinite(numericValue) ? numericValue : minValue;

  if (max === undefined || max === null) {
    return Math.max(normalizedValue, minValue);
  }

  const numericMax = Number(max);
  const maxValue = Number.isFinite(numericMax)
    ? Math.max(numericMax, minValue)
    : undefined;

  if (maxValue === undefined) {
    return Math.max(normalizedValue, minValue);
  }

  return Math.min(Math.max(normalizedValue, minValue), maxValue);
}

function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  disabled = false,
  size = "medium",
}) {
  const currentValue = clamp(value, min, max);
  const canDecrement = !disabled && currentValue > min;
  const canIncrement =
    !disabled && (max === undefined || max === null || currentValue < Number(max));

  const updateValue = (nextValue) => {
    onChange?.(clamp(nextValue, min, max));
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton
        size={size}
        onClick={() => updateValue(currentValue - 1)}
        disabled={!canDecrement}
        aria-label="Decrease quantity"
      >
        <Remove />
      </IconButton>
      <Typography minWidth={32} textAlign="center" fontWeight={900}>
        {currentValue}
      </Typography>
      <IconButton
        size={size}
        onClick={() => updateValue(currentValue + 1)}
        disabled={!canIncrement}
        aria-label="Increase quantity"
      >
        <Add />
      </IconButton>
    </Stack>
  );
}

QuantityStepper.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default QuantityStepper;
