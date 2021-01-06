import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SearchBox = ({ history }) => {

    const [keyword, setKeyword] = useState('')
    const submitHandler = () => {
        if (keyword.trim()) {
            history.push('/search/' + keyword)
        } else {
            history.push('/')
        }
    };
    return (

        <>
            <Form inline>
                <Form.Control type="text" name="q"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="mr-sm-2 ml-sm-5"
                    value={keyword}

                    placeholder="Search">

                </Form.Control>
                <Button type="button" onClick={submitHandler} className="btn-primary" variant>Search</Button>
            </Form></>
    );
}

export default SearchBox;