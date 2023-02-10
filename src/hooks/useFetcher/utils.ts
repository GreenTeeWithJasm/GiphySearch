export const getQueryStringFromQueryParamsList = (
  queryParamsList?: Record<string, unknown> | null
) =>
  queryParamsList
    ? Object.entries(queryParamsList).reduce<string>(
        (queryString, entry, index) => {
          const [param, value] = entry;

          if (
            value &&
            (typeof value === 'string' || typeof value === 'number')
          ) {
            const queryParam = `${param}=${value}`;

            if (index === 0) {
              queryString += `?${queryParam}`;
            } else {
              queryString += `&${queryParam}`;
            }
          }

          return queryString;
        },
        ''
      )
    : '';
