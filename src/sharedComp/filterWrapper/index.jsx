import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Popover, Typography } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

function FilterWrapper({ btnName = "Filter", children, onApply, onReset }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        startIcon={<FilterAlt />}
        onClick={handleClick}
        fullWidth
      >
        {btnName}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={{ xs: 1, md: 2 }}>
          {children ?? <Typography>The content of the filter.</Typography>}
          {(onApply || onReset) && (
            <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
              {onReset && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    onReset();
                    handleClose();
                  }}
                >
                  Reset
                </Button>
              )}
              {onApply && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    onApply();
                    handleClose();
                  }}
                >
                  Apply
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Popover>
    </>
  );
}

FilterWrapper.propTypes = {
  btnName: PropTypes.string,
  children: PropTypes.node.isRequired,
  onApply: PropTypes.func,
  onReset: PropTypes.func,
};

export default FilterWrapper;
