const truncateStr = (str, num) => {
    if (str) {
      if (str.length > num) {
        return str.slice(0, num) + "...";
      } else {
        return str;
      }
    }
  };
   
  export default truncateStr;