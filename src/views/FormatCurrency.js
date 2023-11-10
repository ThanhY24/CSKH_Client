// CurrencyFormat.js
export default function formatCurrency(number) {
  const formattedNumber = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const convertedNumber = formattedNumber.replace("VND", "đ");
  return convertedNumber;
}
