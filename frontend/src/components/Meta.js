import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keyword }) => {
    return (

        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keyword} />
        </Helmet>
    );
}
Meta.defaultProps = {
    title: 'Welcome to Shopping',
    description: 'Best Products',
    keyword: "Buy electronics"
}
export default Meta;