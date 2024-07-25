import type { Meta, StoryObj } from '@storybook/react';

import GoogleOauth from './GoogleOAuth';

const meta = {
  component: GoogleOauth,
} satisfies Meta<typeof GoogleOauth>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};