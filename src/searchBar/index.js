import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const SearchBar = ({ handleSubmit, setKeyword }) => {
  return (
    <div>
      <Form
        inline
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event);
        }}
      >
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(event) => setKeyword(event.target.value)}
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
