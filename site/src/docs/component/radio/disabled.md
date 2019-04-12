### Disabled

Disabled state of Radio.

<!--start-code-->

```jsx
const { Group } = Radio;

const Wrapper = () => {
  const [value, setValue] = React.useState('a');
  const [disabled, setDisabled] = React.useState(true);
  
  return(
    <>
    <Group value={value} onChange={(val) => setValue(val)} disabled={disabled}>
      <Radio value="a">A</Radio>
      <Radio value="b">B</Radio>
      <Radio value="c">C</Radio>
      <Radio value="d">D</Radio>
    </Group>
    <br/>
    <Button color="primary" onClick={() => setDisabled(!disabled)}>Toggle disabled</Button>
    </>
  );
};

render(
  <Wrapper />
);
```

<!--end-code-->