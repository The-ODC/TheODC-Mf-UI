import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { AddShoppingCart, Restaurant, Visibility } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  buildAssetUrl,
  formatCurrency,
  getActivePrice,
  readableLabel,
} from "../../utility";

function ProductCard({
  product,
  assetsBaseUrl = "",
  detailTo,
  onAdd,
  addLabel = "Add",
  viewLabel = "View",
  categoryFallback = "Dish",
  showStock = true,
}) {
  const image = buildAssetUrl({
    baseUrl: assetsBaseUrl,
    folderLocation: product?.folderLocation,
    fileName: product?.images?.[0],
  });
  const price = getActivePrice(product);
  const hasDiscount = product?.discountPrice > 0 && product.discountPrice < product.price;
  const isAvailable = Number(product?.stock || 0) > 0;
  const resolvedDetailTo =
    typeof detailTo === "function" ? detailTo(product) : detailTo;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {image ? (
        <CardMedia
          component="img"
          image={image}
          alt={product?.name}
          sx={{ height: 180 }}
        />
      ) : (
        <Box
          sx={{
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
          }}
        >
          <Restaurant sx={{ fontSize: 64, color: "primary.main" }} />
        </Box>
      )}

      <CardContent sx={{ flex: 1 }}>
        <Stack direction="row" justifyContent="space-between" gap={1} mb={1}>
          <Typography variant="h6" fontWeight={800}>
            {product?.name}
          </Typography>
          <Chip label={readableLabel(product?.category || categoryFallback)} size="small" />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 42 }}>
          {product?.description}
        </Typography>
        <Stack direction="row" alignItems="baseline" spacing={1} mt={2}>
          <Typography variant="h6" color="primary.main" fontWeight={800}>
            {formatCurrency(price)}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ textDecoration: "line-through" }}
            >
              {formatCurrency(product.price)}
            </Typography>
          )}
        </Stack>
        {showStock && (
          <Typography
            variant="caption"
            color={isAvailable ? "success.main" : "error.main"}
          >
            {isAvailable ? `${product?.stock} in stock` : "Out of stock"}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        {resolvedDetailTo && (
          <Button
            component={Link}
            to={resolvedDetailTo}
            variant="outlined"
            startIcon={<Visibility />}
            sx={{ flex: 1 }}
          >
            {viewLabel}
          </Button>
        )}
        {onAdd && (
          <Button
            sx={{ flex: 1 }}
            startIcon={<AddShoppingCart />}
            disabled={!isAvailable}
            onClick={() => onAdd(product)}
          >
            {addLabel}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  assetsBaseUrl: PropTypes.string,
  detailTo: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onAdd: PropTypes.func,
  addLabel: PropTypes.string,
  viewLabel: PropTypes.string,
  categoryFallback: PropTypes.string,
  showStock: PropTypes.bool,
};

export default ProductCard;
