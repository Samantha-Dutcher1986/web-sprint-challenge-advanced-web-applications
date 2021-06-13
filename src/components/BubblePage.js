import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../helpers/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
  const [colorList, setColorList] = useState([])

  useEffect(() => {
    axiosWithAuth()
      .get('http://localhost:3000/api/colors')
      .then((response) => setColorList(response.data))
      .catch((error) => console.error('rendering issue', error))
  }, [])

  return(
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  )
}

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete saveEdit, deleteColor functions
