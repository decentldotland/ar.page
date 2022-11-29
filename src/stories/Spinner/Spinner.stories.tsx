import { Meta, StoryFn } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Spinner',
  component: Spinner,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: StoryFn<typeof Spinner> = (props) => <Spinner {...props} />;

export const Default = Template.bind({});
Default.args = {};
