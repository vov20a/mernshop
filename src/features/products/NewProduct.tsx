import NewProductForm from './NewProductForm'
import { useGetCategoriesQuery } from '../categories/categoriesApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'
import { ICategory } from '../../types/ICategory'

const NewNote = () => {
    useTitle('techNotes: New Note')

    const { categories } = useGetCategoriesQuery("categoriesList", {
        selectFromResult: ({ data }) => ({
            categories: data?.ids.map(id => data?.entities[id]) as ICategory[]
        }),
    })

    if (!categories?.length) return <PulseLoader color={"#000"} className='pulse-loader' />

    const content = <NewProductForm categories={categories} />

    return content
}
export default NewNote