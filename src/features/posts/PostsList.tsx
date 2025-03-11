import { FC } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useGetPostsListQuery } from '../../api/posts';
import { GenericError, Spinner } from '../../components';

export const PostsList: FC = () => {
  const { data: posts, error, isLoading } = useGetPostsListQuery();

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Posts
      </Typography>
      {isLoading && <Spinner centered />}
      {error && <GenericError message={error.message} />}
      {!isLoading && !error && (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', gap: 2 }}>
          {posts?.map((item) => (
            <Card variant="outlined" key={item.id}>
              <CardContent>
                <Typography gutterBottom variant="subtitle2">
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.body}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};
