import { TypographyH1 } from '@cockpit-app/shared-react-ui';
import { Phone, Mail, Linkedin, MapPin } from 'lucide-react';

export interface HeaderData {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: {
    url: string;
    text?: string;
  };
  location: string;
}

export interface HeaderProps {
  headerData: HeaderData;
}

export function Header({ headerData }: HeaderProps) {
  const { name, title, phone, email, linkedin, location } = headerData;
  return (
    <div className="mb-4">
      <TypographyH1>{name}</TypographyH1>
      <h2 className="text-xl text-gray-600 mb-4">{title}</h2>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Phone className="w-4 h-4" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-1">
          <Mail className="w-4 h-4" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-1">
          <Linkedin className="w-4 h-4" />
          <a
            href={`https://${linkedin.url}`}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkedin.text || linkedin.url}
          </a>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
