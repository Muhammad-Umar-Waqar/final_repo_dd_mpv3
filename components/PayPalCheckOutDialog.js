// components/CheckoutModal.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PayPalCheckout from './PayPalCheckout';


export default function CheckoutModal({ open, onClose, productType }) {
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Complete Your Payment
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* Render the PayPal Checkout Component */}
        <PayPalCheckout productType={productType} />
      </DialogContent>
    </Dialog>
  );
}
