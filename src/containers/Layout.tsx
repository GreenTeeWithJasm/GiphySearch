import { Container, Grid, MantineProvider } from '@mantine/core';

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
};

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <MantineProvider withNormalizeCSS>
      <Container>
        <Grid justify="center">{children}</Grid>
      </Container>
    </MantineProvider>
  );
};
