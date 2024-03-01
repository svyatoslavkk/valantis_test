import Select from "../Select/Select";

export default function TopBar() {
  return (
    <div className="top__bar flex__between">
      <h2 className="title">Products</h2>
      <Select />
    </div>
  )
}