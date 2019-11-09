import React from 'react'
import "./item-list.css";

const ItemList = (props) => {

  const { data, children: renderLabel } = props;

  const items = data.map((item) => {
    const {id} = item;
    const label = renderLabel(item);
    return (
      <li className="list-group-item"
          key={id}>
            {label}
      </li>
    )
  });

  return (
    <ul>
      {/* <li className="pokemon-item col-md-3">
        <div className="item">
          <span>Pikachu</span>
          <img src={`https://pokeres.bastionbot.org/images/pokemon/25.png`} alt="pokemon" width="120px" height="120px"/>
        </div>
      </li> */}
      {items}
    </ul>
  );
}

export default ItemList;