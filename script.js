document.addEventListener('DOMContentLoaded', () => {
  console.log('document is fully loaded and parsed.');

  // function to update total price in checkout cart
  const handleCheckOutTotal = () => {
    let checkoutItem = document.querySelectorAll('.cart-checkout-item');
    let checkoutTotal = document.querySelector('.cart-checkout-total-box');

    let total = 0;
    checkoutItem.forEach((item) => {
      let checkoutItemPrice = item.querySelector('.cart-checkout-item-price');
      let quantityInput = item.querySelector(
        '.cart-checkout-item-quantity-input',
      );
      console.log(parseFloat(checkoutItemPrice.textContent.replace('$', '')));
      let price =
        parseFloat(checkoutItemPrice.textContent.replace('$', '')) *
        parseFloat(quantityInput.value);
      total = total + price;
    });
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
    console.log(`Updated Total: $${checkoutTotal.textContent}`);
  };

  // function to handle quanity change for items in checkout
  const handleQuantityChange = () => {
    let quanityInputs = document.querySelectorAll(
      '.cart-checkout-item-quantity-input',
    );
    quanityInputs.forEach((quanity) => {
      quanity.addEventListener('change', (event) => {
        if (event.target.value <= 0) {
          event.target.value = 1;
        } else {
          handleCheckOutTotal();
        }
      });
    });
  };

  // function to remove item via button click from checkout
  const handleRemoveItem = () => {
    let removeItem = document.querySelectorAll('.cart-checkout-item-remove');

    removeItem.forEach((item) => {
      item.addEventListener('click', (event) => {
        const buttonClicked = event.target;
        console.log(buttonClicked.parentElement);
        console.log(
          buttonClicked.parentElement.querySelector(
            '.cart-checkout-item-price',
          ),
        );
        buttonClicked.parentElement.remove();
        handleCheckOutTotal();
      });
    });
  };

  const handleAddItem = () => {
    let checkOutItems = document.querySelector('.cart-checkout-items');
    let addItem = document.querySelectorAll('.cart-shop-item-add');
    addItem.forEach((item) => {
      let buttonClicked = item.parentElement;
      buttonClicked.addEventListener('click', () => {
        let itemImage = buttonClicked.querySelector('.cart-shop-item-image');
        let itemPrice = buttonClicked.querySelector('.cart-shop-item-price');
        let itemTitle = buttonClicked.querySelector('.cart-shop-item-title');
        let itemPriceInNum = parseFloat(itemPrice.textContent.replace('$', ''));
        let newItemHTML = `<div class="cart-checkout-item">
          <img
            class="cart-checkout-item-image"
            src="${itemImage.src}"
            alt="${itemTitle.textContent}"
            width="150px"
          />
          <p class="cart-checkout-item-title">${itemTitle.textContent}</p>
          <p class="cart-checkout-item-price">$${itemPriceInNum}</p>
          <label for="item-quantity">Quantity:</label>
          <input
            type="number"
            id="item-quantity"
            name="item_quantity"
            min="1"
            value="1"
            aria-label="Quantity for item name"
            class="cart-checkout-item-quantity-input"
          />
          <button class="cart-checkout-item-remove">Remove</button>
        </div>`;

        checkOutItems.insertAdjacentHTML('beforeend', newItemHTML);
        handleCheckOutTotal();
        handleRemoveItem();
        handleQuantityChange();
      });
    });
  };

  const handlePurchaseButton = () => {
    let purchaseBtn = document.querySelector('.cart-checkout-purchase-button');
    let checkoutTotal = document.querySelector('.cart-checkout-total-box');

    purchaseBtn.addEventListener('click', () => {
      let total = checkoutTotal.textContent;
      alert(`You successfully purchased items for total price of: ${total}`);
    });
  };

  handleCheckOutTotal();
  handleRemoveItem();
  handleQuantityChange();
  handleAddItem();
  handlePurchaseButton();
});
