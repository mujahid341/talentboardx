import clsx from 'clsx';

const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-gray-200 p-6',
        hover && 'transition-all duration-200 hover:shadow-md hover:border-primary-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
