import { TextField } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import React from "react";

import { SearchPageProps } from "../../types";
import Debounce from "../Debounce";

export interface SearchInputProps extends SearchPageProps {
  placeholder: string;
}

const useStyles = makeStyles(
  {
    input: {
      padding: "10.5px 12px",
    },
    root: {
      flex: 1,
    },
  },
  {
    name: "SearchInput",
  },
);
const SearchInput: React.FC<SearchInputProps> = props => {
  const { initialSearch, onSearchChange, placeholder } = props;
  const classes = useStyles(props);
  const [search, setSearch] = React.useState(initialSearch);

  React.useEffect(() => setSearch(initialSearch), [initialSearch]);

  return (
    <Debounce debounceFn={onSearchChange} time={500}>
      {debounceSearchChange => {
        const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value;

          setSearch(value);
          debounceSearchChange(value);
        };

        return (
          <TextField
            data-test-id="search-input"
            className={classes.root}
            inputProps={{
              className: classes.input,
              placeholder,
            }}
            value={search}
            onChange={handleSearchChange}
          />
        );
      }}
    </Debounce>
  );
};

SearchInput.displayName = "SearchInput";
export default SearchInput;
