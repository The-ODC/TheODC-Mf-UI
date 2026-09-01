import React, {
  useState,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  memo,
} from "react";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Button,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { getCroppedImg } from "../../helpers";
import { getInitials } from "../../utility";

function isUsableAvatar(value) {
  const src = String(value || "").trim();
  return Boolean(
    src &&
    !src.endsWith("/") &&
    !/(^|\/)(undefined|null)(\/|$)/i.test(src) &&
    !src.includes("static/images/avatar")
  );
}

const AvatarUpload = memo(
  ({
    avatar = "",
    name = "",
    alt = "",
    onSave,
    viewOnly = false,
    disabled = false,
    loading = false,
    size = 100,
    accept = "image/*",
    editLabel = "edit avatar",
    cropTitle = "Crop Image",
    cancelLabel = "Cancel",
    saveLabel = "Save",
    children,
    sx,
    ...rest
  }) => {
    const inputId = useId();
    const objectUrlRef = useRef("");
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(
      isUsableAvatar(avatar) ? avatar : ""
    );

    const isBusy = loading || saving;
    const isReadOnly = viewOnly || disabled || isBusy;
    const numericSize = Number(size);
    const progressSize = Number.isFinite(numericSize)
      ? Math.max(24, numericSize * 0.28)
      : 28;
    const previewSrc = useMemo(
      () => (isUsableAvatar(preview) ? preview : ""),
      [preview]
    );

    const initials = useMemo(() => {
      if (children) return children;
      const fullName = String(name || alt || rest.alt || "").trim();
      return getInitials(fullName);
    }, [children, name, alt, rest.alt]);

    useEffect(() => {
      setPreview(isUsableAvatar(avatar) ? avatar : "");
    }, [avatar]);

    useEffect(
      () => () => {
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
        }
      },
      []
    );

    const onFileChange = (e) => {
      if (isReadOnly) return;

      const file = e.target.files?.[0];
      e.target.value = null;

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result);
          setOpenCrop(true);
        };
        reader.readAsDataURL(file);
      }
    };

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const closeCrop = () => {
      setOpenCrop(false);
      setImageSrc(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    };

    const handleCropSave = async () => {
      if (!imageSrc || !croppedAreaPixels || saving) return;

      setSaving(true);
      try {
        const croppedImageFile = await getCroppedImg(
          imageSrc,
          croppedAreaPixels
        );
        const previewUrl = URL.createObjectURL(croppedImageFile);

        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
        }

        objectUrlRef.current = previewUrl;
        setPreview(previewUrl);
        await onSave?.(croppedImageFile);
        closeCrop();
      } finally {
        setSaving(false);
      }
    };

    const avatarElement = (
      <Avatar
        src={previewSrc || undefined}
        sx={{
          width: size,
          height: size,
          border: "2px solid",
          borderColor: "divider",
          bgcolor: previewSrc ? "transparent" : "primary.main",
          color: "primary.contrastText",
          fontSize: Number.isFinite(numericSize)
            ? `${Math.max(14, Math.round(numericSize * 0.36))}px`
            : "1.5rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          ...sx,
        }}
        {...rest}
      >
        {!previewSrc ? initials || null : null}
      </Avatar>
    );

    return (
      <>
        <Box position="relative" width={size} height={size}>
          {!viewOnly && !disabled ? (
            <>
              <input
                accept={accept}
                type="file"
                id={inputId}
                hidden
                disabled={isReadOnly}
                onChange={onFileChange}
              />
              <label
                htmlFor={isReadOnly ? undefined : inputId}
                style={{
                  cursor: isReadOnly ? "default" : "pointer",
                  display: "block",
                }}
              >
                {avatarElement}
                {!isReadOnly && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "background.paper",
                      borderRadius: "50%",
                      boxShadow: 2,
                      "&:hover": { bgcolor: "grey.500" },
                    }}
                    component="span"
                    aria-label={editLabel}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </label>
            </>
          ) : (
            avatarElement
          )}
          {isBusy && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                bgcolor: "rgba(0, 0, 0, 0.36)",
              }}
            >
              <CircularProgress size={progressSize} />
            </Box>
          )}
        </Box>

        <Dialog
          open={openCrop}
          onClose={saving ? undefined : closeCrop}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{cropTitle}</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 300,
                bgcolor: "#333",
              }}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
            <Box mt={2}>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(_, value) => setZoom(value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={closeCrop} disabled={saving}>
              {cancelLabel}
            </Button>
            <Button
              variant="contained"
              onClick={handleCropSave}
              disabled={saving}
            >
              {saving ? "Saving..." : saveLabel}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

AvatarUpload.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  alt: PropTypes.string,
  onSave: PropTypes.func,
  viewOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  accept: PropTypes.string,
  editLabel: PropTypes.string,
  cropTitle: PropTypes.string,
  cancelLabel: PropTypes.string,
  saveLabel: PropTypes.string,
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default AvatarUpload;
