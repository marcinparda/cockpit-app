import { TypographyH1 } from '@cockpit-app/shared-react-ui';
import { Phone, Mail, Linkedin, MapPin } from 'lucide-react';

export interface HeaderProps {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  location: string;
}

/**
 * Header section for CV
 */
export function Header({
  name,
  title,
  phone,
  email,
  linkedin,
  location,
}: HeaderProps) {
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
          <span>{linkedin}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
