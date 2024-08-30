export function InputBox({ label, placeholder, onChange ,value}){
    return (
        
        <div className="mt-2 text-left">
        <label htmlFor="fname" className="font-semibold text-sm">{label}</label><br />
        <input 
          type="text"  onChange={onChange} value={value}
          placeholder={placeholder} 
          className="w-full text-base p-1 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
        />
      </div>
      )
}