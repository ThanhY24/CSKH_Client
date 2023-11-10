class Loading {
  openLoading = () => {
    document.getElementById("loading-container").style.display = "flex";
  };
  closeLoading = () => {
    document.getElementById("loading-container").style.display = "none";
  };
}
export default Loading;
