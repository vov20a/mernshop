import React from 'react'
import { EntityId, Dictionary } from '@reduxjs/toolkit'
import { ICategory } from '../types/ICategory';
import { Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface CategoriesListProps {
    arrayCategoryId: EntityId[];
    entities: Dictionary<ICategory>
}

const CategoryList = ({ arrayCategoryId, entities }: CategoriesListProps) => {
    // const location = useLocation();
    // const activeName = React.useRef<HTMLDivElement>(null)
    // const [activeClass, setActiveClass] = React.useState('menu')

    // React.useEffect(() => {
    //     // const handleClickOutside = () => {
    //     activeName.current?.par  .add('active')
    //     // setActiveClass('menu active')
    //     console.dir(activeName.current)
    //     //   }
    //     // };
    //     // document.body.addEventListener('click', handleClickOutside);
    //     // return () => {
    //     //   document.body.removeEventListener('click', handleClickOutside);
    //     // };
    // }, [location]);

    let content;
    if (arrayCategoryId.length === 1) {
        content =
            <Nav.Item className='menu-item'>
                <NavLink to={`/categories/${entities[arrayCategoryId[0]]?.id}`}>{entities[arrayCategoryId[0]]?.title}</NavLink>
            </Nav.Item>
    } else if (arrayCategoryId.length > 1) {
        content = <NavDropdown title={entities[arrayCategoryId[0]]?.title} id="nav-dropdown" className="menu">
            {arrayCategoryId.slice(1).map((categoryId) =>
                <Nav key={categoryId}>
                    <NavLink to={`/categories/${entities[categoryId]?.id}`}>{entities[categoryId]?.title}</NavLink>
                </Nav>
                // {entities[categoryId]?.title}
            )}
        </NavDropdown>
    }

    return <>{content}</>;
}


export default CategoryList