import {
  ActionIcon,
  Container,
  Grid,
  TextInput,
  useMantineTheme
} from '@mantine/core';

import { SearchIcon } from '../../icons/SearchIcon';
import { useComponent } from './useComponent';

export const SearchInput = (): JSX.Element => {
  const theme = useMantineTheme();
  const { clickSearchIconHandler, inputChangeHandler } = useComponent();

  return (
    <Grid.Col xs={12}>
      <Grid justify="center">
        <Grid.Col xs={12} sm={8} mt={15}>
          <Container pl={15} pr={15}>
            <TextInput
              placeholder="Start typing..."
              radius="xl"
              size="md"
              onChange={inputChangeHandler}
              rightSection={
                <ActionIcon
                  size={32}
                  radius="xl"
                  color={theme.primaryColor}
                  variant="filled"
                  onClick={clickSearchIconHandler}
                >
                  <SearchIcon />
                </ActionIcon>
              }
              rightSectionWidth={42}
            />
          </Container>
        </Grid.Col>
      </Grid>
    </Grid.Col>
  );
};
