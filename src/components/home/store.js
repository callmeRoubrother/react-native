const data = (state = {}, action) => {
  const { type, data } = action;
  switch(type){
    default:
      return data;
  }
};

export default data;