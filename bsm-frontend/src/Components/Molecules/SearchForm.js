import React from "react";
import { Input } from '../Atoms/Input'

const SearchForm = (props) => {
  return (
    <form onSubmit={props.onSubmit} className={props/className}>
      <Input {...props.input}/>
    </form>
  )
}

export default SearchForm;