// eslint-disable-next-line react/prop-types
const TestClip = ({name, desc, uri}) => {
  return (
<a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100 flex-none w-200 h-200">
  <img
    alt="Clip"
    src={uri}
    className="h-56 w-full rounded-md object-cover"
  />

  <div className="mt-2">
    <dl>
      <div>
        <dt className="sr-only">Name</dt>
        <dd className="font-medium">{name}</dd>
      </div>
      <div>
        <dt className="sr-only">Description</dt>
        <dd className="text-sm text-gray-500">{desc}</dd>
      </div>
    </dl>
  </div>
</a>
  )
}

export default TestClip