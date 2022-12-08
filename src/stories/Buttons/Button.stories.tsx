import { StoryFn, Meta } from '@storybook/react';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import { CButton } from './CButton';

export default {
  title: 'CButton',
  component: CButton,
} as Meta<typeof CButton>;

const Template: StoryFn<typeof CButton> = (args) => <CButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Connect Wallet',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Button',
};

export const PinkSheet = Template.bind({});
PinkSheet.args = {
  variant: 'pinksheet',
  children: 'Approve',
};

export const BlueChip = Template.bind({});
BlueChip.args = {
  variant: 'bluechip',
  children: 'Approve',
};

export const TextPinkSheet = Template.bind({});
TextPinkSheet.args = {
  variant: 'textPinksheet',
  children: 'Sample',
};

export const TextBlueChip = Template.bind({});
TextBlueChip.args = {
  variant: 'textBluechip',
  children: 'Sample',
};

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
  children: 'Button',
  startIcon: <WarningIcon />,
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
  children: 'Button',
  endIcon: <CheckIcon />,
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Button',
  isLoading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Button',
  disabled: true,
};

export const FitContainerWidth = Template.bind({});
FitContainerWidth.args = {
  children: 'Connect Wallet',
  fitContentWidth: false,
};

export const Custom = Template.bind({});
Custom.args = {
  variant: 'custom',
  className: 'bg-red-500 py-2 px-8 text-xl',
  children: 'Text'
};
