const translate = (text) => {
  switch (text) {
    case "visitant":
      return "visitante";
    case "employee":
      return "funcionário";
  }
};

export default translate;
